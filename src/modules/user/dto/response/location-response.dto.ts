import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsString } from 'class-validator';

export class City {
    @ApiProperty({ example: '67e8bd21d3a3dee957df13de' })
    @IsMongoId()
    id: string;

    @ApiProperty({ example: 'Apaneca' })
    @IsString()
    name: string;
}

export class State {
    @ApiProperty({ example: '67e8bd21d3a3dee957df13db' })
    @IsMongoId()
    id: string;

    @ApiProperty({ example: 'Ahuachapán' })
    @IsString()
    name: string;
}

export class LocationResponse {
    @ApiProperty({
        type: [City],
        description: 'Lista de municipios',
    })
    @IsArray()
    city: City[];

    @ApiProperty({
        type: [State],
        description: 'Lista de departamentos',
    })
    @IsArray()
    state: State[];
}
