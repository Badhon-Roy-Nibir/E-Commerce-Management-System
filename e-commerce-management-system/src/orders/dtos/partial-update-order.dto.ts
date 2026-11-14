import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateOrderDto } from "./create-order.dto.js";

export class PartialUpdateOrderdto extends PartialType (OmitType (CreateOrderDto, ['orderItems'] as const)){}