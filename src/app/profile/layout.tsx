import ProfileLayoutClient from "./profile-layout-client";

// Profile routes use cookies for auth - must be dynamic, not statically prerendered
export const dynamic = "force-dynamic";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProfileLayoutClient>{children}</ProfileLayoutClient>;
}
