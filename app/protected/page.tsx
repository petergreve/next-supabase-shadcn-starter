import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Hello World! 👋</CardTitle>
          <CardDescription>
            Welcome to your protected area
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-4">
            You&apos;re successfully signed in as:
          </p>
          <p className="font-medium text-lg mb-6">
            {data.claims.email}
          </p>
          <p className="text-sm text-muted-foreground">
            This is your starting point. Start building your amazing app from here!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
