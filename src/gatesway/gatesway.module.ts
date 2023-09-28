import { Module } from "@nestjs/common";
import { MyGatesway } from "./gatesway";

@Module({
    providers: [MyGatesway]
})
export class GatesWayModule {}