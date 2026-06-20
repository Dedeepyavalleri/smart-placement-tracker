const bcrypt = require("bcrypt");

async function test() {

    const hashedPassword =
        await bcrypt.hash("1234", 10);

    console.log(hashedPassword);

}

test();