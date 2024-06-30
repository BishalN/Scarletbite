import * as z from "zod"
import { CompleteOrderItem, RelatedOrderItemModel } from "./index"

export const MenuItemModel = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  isAvailable: z.boolean(),
  thumbnail: z.string().nullish(),
})

export interface CompleteMenuItem extends z.infer<typeof MenuItemModel> {
  orders: CompleteOrderItem[]
}

/**
 * RelatedMenuItemModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMenuItemModel: z.ZodSchema<CompleteMenuItem> = z.lazy(() => MenuItemModel.extend({
  orders: RelatedOrderItemModel.array(),
}))
