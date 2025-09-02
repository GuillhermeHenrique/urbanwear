export default class UserController {
  static home(req, res) {
    res.status(200).json({ message: "Everything OK!" });
  }
}
