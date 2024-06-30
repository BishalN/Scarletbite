import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const PreferenceModel = z.object({
  id: z.number().int(),
  currency: z.string(),
  cashOnDelivery: z.boolean(),
  userId: z.string(),
})

export interface CompletePreference extends z.infer<typeof PreferenceModel> {
  user: CompleteUser
}

/**
 * RelatedPreferenceModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPreferenceModel: z.ZodSchema<CompletePreference> = z.lazy(() => PreferenceModel.extend({
  user: RelatedUserModel,
}))
