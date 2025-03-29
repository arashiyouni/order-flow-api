import { Module } from "@nestjs/common";
import { AuthModule } from "./auth.module";
import { UserModule } from "../user/user.module";

@Module({
    imports: [AuthModule],
    exports: [AuthModule],
})
export class CommonModule { }