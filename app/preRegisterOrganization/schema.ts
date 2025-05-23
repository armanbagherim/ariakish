import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    title: Yup.string().required("عنوان الزامی است"),
    licenseCode: Yup.string().required("شناسه جواز کسب الزامی است"),
    licenseDate: Yup.date()
        .required("تاریخ جواز کسب الزامی است")
        .nullable()
        .typeError("تاریخ جواز کسب نامعتبر است"),
    licenseAttachmentId: Yup.number()
        .required("تصویر پروانه کسب الزامی است")
        .nullable()
        .typeError("شناسه پروانه کسب نامعتبر است"),
    nationalAttachmentId: Yup.number()
        .required("تصویر کارت ملی الزامی است")
        .nullable()
        .typeError("شناسه کارت ملی نامعتبر است"),
    estateAttachmentId: Yup.number()
        .required("تصویر سند ملک الزامی است")
        .nullable()
        .typeError("شناسه سند ملک نامعتبر است"),
    postalAttachmentId: Yup.number()
        .required("تصویر تاییدیه کد پستی الزامی است")
        .nullable()
        .typeError("شناسه تاییدیه کد پستی نامعتبر است"),
    user: Yup.object().shape({
        phoneNumber: Yup.string()
            .matches(/^\d{11}$/, "شماره تماس باید ۱۱ رقم باشد")
            .required("شماره تماس الزامی است"),
        firstname: Yup.string().required("نام الزامی است"),
        lastname: Yup.string().required("نام خانوادگی الزامی است"),
    }),

    address: Yup.object().shape({
        name: Yup.string().required("نام آدرس الزامی است"),
        latitude: Yup.string().required("عرض جغرافیایی الزامی است"),
        longitude: Yup.string().required("طول جغرافیایی الزامی است"),
        provinceId: Yup.number()
            .min(1, "استان باید انتخاب شود")
            .required("استان الزامی است"),
        
        street: Yup.string().required("خیابان الزامی است"),
        alley: Yup.string().required("کوچه الزامی است"),
        plaque: Yup.string().required("پلاک الزامی است"),
        floorNumber: Yup.string().required("شماره طبقه الزامی است"),
        postalCode: Yup.string()
            .matches(/^\d{10}$/, "کد پستی باید ۱۰ رقم باشد")
            .required("کد پستی الزامی است"),
    }),
});