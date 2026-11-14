import { PartialType } from "@nestjs/mapped-types";
import { CreateOrderItemDto } from "./create-orderitem.dto.js";

export class PartialOrderItemDto extends PartialType(CreateOrderItemDto){}