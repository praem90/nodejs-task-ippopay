import { NextRequest, NextResponse } from "next/server";
import { connectDB } from '@/app/_lib/mongoose/connect';
import { PasswordValidation } from "@/app/_lib/mongoose/models/validation";
import PasswordValidator from '@/Validators/Password/validator';



export async function POST(request: NextRequest) {
    connectDB()
    const data = await request.json();

    if (!data.password) {
        return NextResponse.json({ message: "Please provide password to validate" }, { status: 422 });
    }

    const steps = PasswordValidator(data.password)
    let message = "Your password is strong!!";

    if (steps) {
        message = `Your password is weak. You can make it strong in ${steps} step(s)`;
    }


    const validation = new PasswordValidation({
        password: data.password,
        steps,
        message,
        created: new Date
    });

    await validation.save();

    if (steps) {
        return NextResponse.json({ message }, { status: 422 });
    }

    return NextResponse.json({ message });
}


export async function GET(request: NextRequest) {
    connectDB()
    const url = new URL(request.url);

    const page = parseInt(url.searchParams.get('page') || '1');

    const options = {
        limit: parseInt(url.searchParams.get('limit') || '10'),
        skip: 0,
    };

    options.skip = (page - 1) * options.limit;

    const search = new RegExp(url.searchParams.get('search') || '', 'i');

    const filters = {
        $or: [
            { password: search },
            { message: search }
        ]
    };


    const query = PasswordValidation.find(filters, null, options);

    query.sort('-created');

    return NextResponse.json({
        total: await PasswordValidation.countDocuments(filters),
        passwords: await query
    })
}