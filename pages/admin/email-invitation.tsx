export default function EmailInvitation() {
  return (
    <>
      <h2>You have been invited</h2>

      <p>
        You have been invited to create a user on {"{{ .SiteURL }}"}. Follow
        this link to accept the invite:
      </p>
      <p>
        <a href="{{ .ConfirmationURL }}/admin/">Accept the invite</a>
      </p>
    </>
  );
}
