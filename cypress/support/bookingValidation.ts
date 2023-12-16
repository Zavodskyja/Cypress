import Ajv from 'ajv';
import { bookingResponseSchema, bookingIDSchema } from '../fixtures/schemas/schema';

const ajv = new Ajv();

const validateResponse = (responseBody: any, schema: any): boolean => {
  const validate = ajv.compile(schema);
  const isValid = validate(responseBody);

  if (!isValid) {
    console.log('Validation errors:', validate.errors);
  }

  return isValid;
};

export const validateBookingResponse = (responseBody: any): boolean => {
  return validateResponse(responseBody, bookingResponseSchema);
};

export const validateBookingIDResponse = (data: any): boolean => {
  return validateResponse(data, bookingIDSchema);
};
