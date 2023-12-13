import Ajv from 'ajv';
const ajv = new Ajv()
import { bookingResponseSchema, bookingIDSchema } from './schema';



export const validateBookingResponse = (responseBody: any): boolean => {
  const validate = ajv.compile(bookingResponseSchema);
  const isValid = validate(responseBody);

  if (!isValid) {
    console.error('Validation errors:', validate.errors);
    console.log('Validation errors:', validate.errors);
  }

  return isValid;
};


  export const validateBookingIDResponse = (data: any): boolean => {
    const validate = ajv.compile(bookingIDSchema);
    const isValid = validate(data);
  
    if (!isValid) {
      console.error('Validation errors:', validate.errors);
      console.log('Validation errors:', validate.errors);
    }
  
    return isValid;
  };


