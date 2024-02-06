import * as yup from 'yup'

export const useLoginSchema = yup.object({
   email: yup.string().email('Email tidak valid').required('Email tidak boleh kosong'),
   password: yup.string().required('Kata sandi harus diisi')
})