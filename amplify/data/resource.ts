import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Memo: a
    .model({
      name: a.string().required(),
      job: a.string().required(),
      hobby: a.string().required(),
      other: a.string(),
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
