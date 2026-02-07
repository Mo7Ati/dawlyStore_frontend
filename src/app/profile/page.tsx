import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileForm from "./components/profile-form";

export default function ProfilePage() {
  return (
    <div className="w-full min-w-0 space-y-6">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground text-sm">Manage your account settings.</p>
      </div>
      <Card className="w-full border-none shadow-sm">
        <CardHeader>
          <CardTitle>Profile information</CardTitle>
          <CardDescription>
            Update your name, email, and phone number.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm />
        </CardContent>
      </Card>
    </div>
  );
}
