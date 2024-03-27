import { db } from "@/lib/db";
const { NextResponse } = require("next/server");

export async function DELETE(req, {params}) {
  /*  const {id} = await req.params; */

  try {

    console.log(params.id);
    const deletedTest = await db.test.delete({
      where: { id : params.id },
    });
    if (!deletedTest) {
      return NextResponse.error(new Error("Test not found"), { status: 404 });
    }
    return NextResponse.json({ message: "Test deleted successfully" });
  } catch (error) {
    console.error("Error deleting test:", error);
    return NextResponse.error(error, { status: 500 });
  }
}
