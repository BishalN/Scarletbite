import * as z from "zod"
import { OrderStatus } from "@prisma/client"
import { CompleteUser, RelatedUserModel, CompleteOrderItem, RelatedOrderItemModel } from "./index"

export const OrderModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  status: z.nativeEnum(OrderStatus),
  userId: z.string(),
})

export interface CompleteOrder extends z.infer<typeof OrderModel> {
  user: CompleteUser
  orderItems: CompleteOrderItem[]
}

/**
 * RelatedOrderModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrderModel: z.ZodSchema<CompleteOrder> = z.lazy(() => OrderModel.extend({
  user: RelatedUserModel,
  orderItems: RelatedOrderItemModel.array(),
}))
