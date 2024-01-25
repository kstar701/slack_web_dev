import bcrypt from "bcrypt";
import User from "../models/user";
import ChatMember from "../models/chatMember";

export const getSignup = (req, res) => {
  res.render("signup", { pageTitle: "회원가입" });
};
export const postSignup = async (req, res) => {
  const { email, name, birth, password, password2 } = req.body;

  if (password !== password2) {
    return "<script>alert('비밀번호가 일치 하지 않습니다!'); window.location.replace('/signup'); </script>";
  }
  // 유저 정보 조회
  const userExists = await User.exists({ email });
  if (userExists) {
    return res.send(
      "<script>alert('이미 등록된 사용자입니다.'); window.location.replace('/signup'); </script>"
    );
  }

  try {
    const newUser = await User.create({
      email,
      name,
      birth,
      password,
    });
    const newChatMember = await ChatMember.create({
      userId: newUser._id,
    });
    res
      .status(201)
      .json({ message: " 회원가입 완료 ", newUser, newChatMember });
  } catch (error) {
    return res.send(
      "<script>alert('가입에러!'); window.location.replace('/signup'); </script>"
    );
  }
};

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "로그인페이지" });
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.send(
      "<script>alert('등록되지 않은 사용자!!'); window.location.replace('/'); </script>"
    );
  }
  // 비밀번호 비교 함수 user.password = 데이터베이스에 저장된 해싱된 비밀번호
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.send(
      "<script>alert('잘못된 비밀번호 !!'); window.location.replace('/'); </script>"
    );
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/main");
};

export const getMain = async (req, res) => {
  const user = req.session.user;
  const now = new Date();

  // 입사 후 지금까지 근무일 계산
  const time = new Date(user.register_date);
  const timeDifference = now - time;
  const allWorkTime = Math.floor(timeDifference / (1000 * 60 * 60 * 24) + 1);

  return res.render("main", { pageTitle: "슬랙홈", user, allWorkTime });
};

export const getChat = async (req, res) => {
  try {
    const chatMembers = await ChatMember.find().populate("userId");
    // console.log(chatMembers);
    res.render("chat", { pageTitle: "채팅", chatMembers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const getMeeting = (req, res) => {
  return res.render("meeting", { pageTitle: "회의" });
};
export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    console.log(req.session);
    res.redirect("/");
  });
};
