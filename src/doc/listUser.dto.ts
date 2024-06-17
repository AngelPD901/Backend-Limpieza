import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/auth/entities/user.entity";

export class ListUserDto{
    @ApiProperty({type:User})
    listuser: User[];
}