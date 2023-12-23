import { transporter, emailoptions } from "@/nodemailer";
import { NextResponse } from "next/server";

export async function POST(request){
    try {
        const result = await request.json();
        console.log(result)
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim();
    
        const emailContent = `
          <h2>From: ${result.input1}</h2>
          <h3>Customer Email: ${result.input2}</h3>
          <h4>Client IP: ${ip}</h4>
          <div style="border: solid black 2px; padding: 20px ">
          <h3>Customer Message</h3>
          <p>${result.input3}</p>
          </div>
        `;
    
        await transporter.sendMail({
          ...emailoptions,
          subject: `Customer response from ${result.input1}`,
          text: "this is a test string",
          html: emailContent,
        });
    
        return new NextResponse(JSON.stringify({ message: "Email sent successfully" }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
      } catch (error) {
        console.error('Error:', error);
        return new NextResponse(JSON.stringify({ message: "Failed to send email" }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
      return NextResponse.json({})
}