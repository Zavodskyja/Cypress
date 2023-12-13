export const bookingResponseSchema = {
  type: 'object',
  properties: {
    firstname: { type: 'string' },
    lastname: { type: 'string' },
    totalprice: { type: 'number' },
    depositpaid: { type: 'boolean' },
    bookingdates: {
      type: 'object',
      properties: {
        checkin: { type: 'string' },
        checkout: { type: 'string' },
      },
      required: ['checkin', 'checkout'],
    },
    additionalneeds: { type: 'string' },
  },
  required: ['firstname', 'lastname', 'totalprice', 'depositpaid', 'bookingdates', 'additionalneeds'],
};

export const bookingIDSchema = {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        bookingid: { type: 'number' }
      },
      required: ['bookingid']
    }
  };