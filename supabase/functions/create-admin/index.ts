
// import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
// import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// const supabaseUrl = "https://btwbkfguvamrcwfxjurh.supabase.co";
// const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0d2JrZmd1dmFtcmN3ZnhqdXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MDA0MDYsImV4cCI6MjA2NzM3NjQwNn0.uNC-X9ofnASf4ndqNwlWmrfWdGecynCPVF9Le1eCGWk";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers":
//     "authorization, x-client-info, apikey, content-type",
// };

// serve(async (req) => {
//   if (req.method === "OPTIONS") {
//     return new Response(null, { headers: corsHeaders });
//   }

//   try {
//     const supabaseAdmin = createClient(
//      supabaseUrl ?? "",
//      supabaseKey ?? ""
//     );

//     const { email, password } = await req.json();

//     // Create user with admin service
//     const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
//       email,
//       password,
//       email_confirm: true
//     });

//     if (userError) throw userError;

//     // Create admin user record
//     const { error: adminError } = await supabaseAdmin
//       .from('admin_users')
//       .insert({
//         user_id: userData.user.id,
//         email: email,
//         role: 'admin'
//       });

//     if (adminError) throw adminError;

//     return new Response(
//       JSON.stringify({ success: true, user: userData.user }),
//       {
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//         status: 200,
//       }
//     );
//   } catch (error) {
//     return new Response(
//       JSON.stringify({ error: error.message }),
//       {
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//         status: 400,
//       }
//     );
//   }
// });

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const supabaseUrl = "https://rragtzqmlsbwlkpcioql.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyYWd0enFtbHNid2xrcGNpb3FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNjE3NzMsImV4cCI6MjA2NzYzNzc3M30.eTxQwbz8q9DVU2ujTCbYxWSJ7VmB84Sfg-qEIkx3H4Y";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
     supabaseUrl ?? "",
     supabaseKey ?? ""
    );

    const { email, password } = await req.json();

    // Create user with admin service
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });

    if (userError) throw userError;

    // Create admin user record
    const { error: adminError } = await supabaseAdmin
      .from('admin_users')
      .insert({
        user_id: userData.user.id,
        email: email,
        role: 'admin'
      });

    if (adminError) throw adminError;

    return new Response(
      JSON.stringify({ success: true, user: userData.user }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});