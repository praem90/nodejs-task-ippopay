import { NextRequest, NextResponse } from "next/server";
import {connectDB} from '@/app/_lib/mongoose/connect';
import { PasswordValidation } from "@/app/_lib/mongoose/models/validation";
import PasswordValidator from '@/Validators/Password/validator';

  

export async function POST(request: NextRequest) {
    connectDB()
    const data = await request.json();

    if (!data.password) {
        return NextResponse.json({message: "Please provide password to validate"}, {status: 422});
    }
    
    const steps = PasswordValidator(data.password)

    const validation = new PasswordValidation({
        password: data.password,
        steps
    });

    const res = await validation.save();

    if (steps) {
        return NextResponse.json({message: `Your password is weak. You can make it strong in ${steps} step{s}`}, {status: 422});
    }

    return NextResponse.json({message: "Your password is strong!!"});
}


export async function GET(request: NextRequest) {
    connectDB()

    return NextResponse.json(await PasswordValidation.find())
}