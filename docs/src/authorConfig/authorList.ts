import type { StarlightBlogConfig } from "starlight-blog";
import alaminkouser from "./pictures/alaminkouser.png";

const authorList: StarlightBlogConfig["authors"] = {
  alaminkouser: {
    name: "AL AMIN KOUSER",
    title: "Software Engineer & Maritime Researcher",
    picture: alaminkouser.src,
    url: "https://alaminkouser.com/",
  },
};

export default authorList;
