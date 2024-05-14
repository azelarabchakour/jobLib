export default function EditPassword(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setOpen(true);
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("Access token not found");
      return;
    }

    const headers = {
      Authorization: `JWT ${accessToken}`,
      "Content-Type": "application/json",
    };

    try {
      // Update password
      await axios.post(
        "http://127.0.0.1:8000/auth/users/set_password/",
        { current_password: password, new_password: newPassword },
        { headers }
      );
      console.log("Password updated successfully");
      // Redirect back to user info page
      setOpen(false);
    } catch (error) {
      // Handle errors
      console.error(error);
      setOpen(true);
      setError("Error updating password");
    }
  };
  
  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <form onSubmit={handleSubmit}>
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardHeader
              color="red" //header card color
              floated={false}
              shadow={false}
              className="m-0 grid place-items-center px-4 py-8 text-center bg-gradient-to-b from-mantis-400 to-mantis-700"
            >
              <div className="mb-4 h-1 p-6 text-white">
                <Typography variant="h4" className="text-mantis-50">
                  Modify Password
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Typography className="-mb-2 text-mantis-900" variant="h6">
                Old Password
              </Typography>
              <Input
                label="Old Password"
                color="teal"
                size="lg"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <Typography className="-mb-2 text-mantis-900" variant="h6">
                New Password
              </Typography>
              <Input
                label="New Password"
                color="teal"
                size="lg"
                type="password"
                value={newPassword}
                onChange={handleNewPasswordChange}
              />

              <Typography className="-mb-2 text-mantis-900" variant="h6">
                Confirm New Password
              </Typography>
              <Input
                label="Confirm New Password"
                color="teal"
                size="lg"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {error && (
                <Typography variant="small" color="red">
                  {error}
                </Typography>
              )}
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                className="bg-mantis-600 text-mantis-50"
                type="submit"
                onClick={handleOpen}
                fullWidth
              >
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Dialog>
    </>
  );
}
