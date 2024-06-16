import { useState, useMemo } from 'react';
import config from '../../configs';

function useMultipartForm({ FORM_FILEDS, initalFormValues = {} }) {
    const [form, setForm] = useState(() => {
        let initFormFields = {};
        /* Init default value for each field in form */
        Object.keys(FORM_FILEDS).forEach((key) => {
            const formField = FORM_FILEDS[key];

            switch (formField.type) {
                case 'number': {
                    initFormFields[formField.name] =
                        initalFormValues[formField.name] || 0;
                    break;
                }

                case 'string': {
                    initFormFields[formField.name] =
                        initalFormValues[formField.name] || '';
                    break;
                }

                case 'array':
                case 'fileArray': {
                    initFormFields[formField.name] =
                        initalFormValues[formField.name] || [];
                    break;
                }
            }
        });

        return initFormFields;
    });

    const setFormField =
        ({ fieldName, type }) =>
        (value) => {
            switch (type) {
                case 'number':
                case 'string': {
                    setForm((prev) => {
                        return {
                            ...prev,
                            [fieldName]: value,
                        };
                    });
                    break;
                }

                case 'array': {
                    setForm((prev) => {
                        /* After removing duplicate (item has been in array) */
                        let cloneArray = form[fieldName];

                        return cloneArray.includes(value)
                            ? { ...prev }
                            : {
                                  ...prev,
                                  [fieldName]: cloneArray.push(value),
                              };
                    });
                    break;
                }

                case 'fileArray': {
                    setForm((prev) => {
                        /* After removing duplicate (item has been in array) */
                        const finalNewItems = [];

                        /* Name of existed items */
                        const existedItemName = form[fieldName].map(
                            (item) => item.name
                        );

                        /* Choose only item which has not been in array */
                        value.forEach((item) => {
                            if (!existedItemName.includes(item.name)) {
                                finalNewItems.push(item);
                            }
                        });

                        return {
                            ...prev,
                            [fieldName]: [
                                ...form[fieldName],
                                ...finalNewItems,
                            ],
                        };
                    });
                }
            }
        };

    const setRating = (rating) => () => {
        setFormField({
            fieldName: FORM_FILEDS.RATING.name,
            type: FORM_FILEDS.RATING.type,
        })(rating === form[FORM_FILEDS.RATING.name] ? 0 : rating);
    };

    const removeFile =
        ({ url, file, type }) =>
        () => {
            if (type === 'file_object') {
                setForm((prev) => {
                    const fileArrayAfterRemoving = prev[
                        FORM_FILEDS.FILES.name
                    ].filter((f) => f.name !== file.name);

                    return {
                        ...prev,
                        [FORM_FILEDS.FILES.name]: fileArrayAfterRemoving,
                    };
                });
            }

            if (type === 'file_url') {
                setForm((prev) => {
                    const fileArrayAfterRemoving = prev[
                        FORM_FILEDS.FILE_URLS.name
                    ].filter((u) => u !== url);

                    return {
                        ...prev,
                        [FORM_FILEDS.FILE_URLS.name]:
                            fileArrayAfterRemoving,
                    };
                });
            }
        };

    const previewImages = useMemo(() => {
        const fileArray = form[FORM_FILEDS?.FILES?.name] || [];
        const fileUrls = form[FORM_FILEDS?.FILE_URLS?.name] || [];

        let result = [];

        if (fileArray && fileArray.length !== 0) {
            fileArray.forEach((file) => {
                result.push({
                    url: URL.createObjectURL(file),
                    file,
                    type: 'file_object',
                });
            });
        }

        if (fileUrls && fileUrls.length !== 0) {
            fileUrls.forEach((url) => {
                result.push({
                    url: `${config.SERVER_URL}/${url}`,
                    originUrl: url,
                    file: null,
                    type: 'file_url',
                });
            });
        }

        return result;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        // eslint-disable-next-line react-hooks/exhaustive-deps
        form[FORM_FILEDS?.FILES?.name],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        form[FORM_FILEDS?.FILE_URLS?.name],
    ]);

    return {
        form,
        setFormField,
        setRating,
        previewImages,
        removeFile,
    };
}

export default useMultipartForm;
