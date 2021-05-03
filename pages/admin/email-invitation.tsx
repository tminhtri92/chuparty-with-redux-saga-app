export default function EmailInvitation() {
  return (
    <>
      <h2>You have been invited 345345345345</h2>

      <p>
        You have been invited to create a user on {"{{ .SiteURL }}"}. Follow
        this link to accept the invite:
      </p>
      <p>
        <a href="{{ .ConfirmationURL }}">Accept the invite</a>
      </p>
    </>
  );
}
