import * as z from "zod"
import { CompleteMenuItem, RelatedMenuItemModel, CompleteOrder, RelatedOrderModel } from "./index"

export const OrderItemModel = z.object({
  id: z.number().int(),
  quantity: z.number().int(),
  menuItemId: z.number().int(),
  orderId: z.number().int(),
})

export interface CompleteOrderItem extends z.infer<typeof OrderItemModel> {
  menuItem: CompleteMenuItem
  order: CompleteOrder
}

/**
 * RelatedOrderItemModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrderItemModel: z.ZodSchema<CompleteOrderItem> = z.lazy(() => OrderItemModel.extend({
  menuItem: RelatedMenuItemModel,
  order: RelatedOrderModel,
}))
