import { server } from "https://deno.land/x/oak@v11.1.0/mod.ts";

server(async (req) => {
    const { name } = await req.json();

    const data = `Hello ${name}`;

    return new Response(
        JSON.stringify({ data }),
        { headers: { "Content-Type": "application/json" } },
    );
})