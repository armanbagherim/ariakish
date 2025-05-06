import * as Yup from "yup";

export const validationSchema = Yup.object({
    title: Yup.string().required("عنوان ضروری است"),
    licenseDate: Yup.date().required("تاریخ مجوز ضروری است"),
    licenseAttachmentId: Yup.number().required("فایل پروانه کسب ضروری است"),
    nationalAttachmentId: Yup.number().required("فایل کارت ملی ضروری است"),
    estateAttachmentId: Yup.number().required("فایل سند ملک ضروری است"),
    postalAttachmentId: Yup.number().required("فایل قبض پستی ضروری است"),
    address: Yup.object({
        name: Yup.string().required("نام آدرس ضروری است"),
        latitude: Yup.string().required("عرض جغرافیایی ضروری است"),
        longitude: Yup.string().required("طول جغرافیایی ضروری است"),
        provinceId: Yup.number().required("استان ضروری است"),
        cityId: Yup.number().required("شهر ضروری است"),
        neighborhoodId: Yup.number().required("محله ضروری است"),
        street: Yup.string().required("خیابان ضروری است"),
        alley: Yup.string().required("کوچه ضروری است"),
        plaque: Yup.string().required("پلاک ضروری است"),
        floorNumber: Yup.string().required("شماره طبقه ضروری است"),
        postalCode: Yup.string().required("کد پستی ضروری است"),
    }),
    user: Yup.object({
        phoneNumber: Yup.object({
            countryCode: Yup.string().required("کد کشور ضروری است"),
            phone: Yup.string().required("شماره موبایل ضروری است"),
        }).required("اطلاعات شماره موبایل ضروری است"),
        firstname: Yup.string().required("نام ضروری است"),
        lastname: Yup.string().required("نام خانوادگی ضروری است"),
    }),
});
