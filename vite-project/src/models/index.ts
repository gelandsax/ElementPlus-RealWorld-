export interface Tags {
  tags: string[];
}


export interface MultiArticles {
  articles: Article[];
  articlesCount: number;
}
export interface SingleArticleInfo {
  article: Article;
}
export interface Article {
  slug: string;
  title: string;
  description: string;
  body:string,
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
}
export interface Author {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}
export interface CreateArticleReq {
  article: ArticleBody;
}

export interface ArticleBody {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export interface LoginReq {
  user: UserLoginBody;
}
export interface UserLoginBody {
  email: string;
  password: string;
}

export interface LoginRsp {
  user: UserLoginRsp;
}
export interface UserLoginRsp {
  email: string;
  token: string;
  username: string;
  bio: string;
  image?: any;
}

export interface RegisterReq {
  user: UserRegisterBody;
}
export interface UserRegisterBody {
  username: string;
  email: string;
  password: string;
}
export interface RegisterRsp {
  user: UserRegisterRsp;
}
export interface UserRegisterRsp {
  email: string;
  token: string;
  username: string;
  bio: string;
  image?: any;
}

export interface updateUserReq {
  user: updateUserReqBody;
}
export interface updateUserReqBody {
  username?: string;
  password?: string;
  email?: string;
  bio?: string;
  image?: string;
}
export interface updateUserRsp {
  user: updateUserRspBody;
}
export interface updateUserRspBody {
  email: string | null;
  token: string | null;
  username: string | null;
  bio: string | null;
  image: string | null;
}

export interface FollowResult {
  profile: Profile;
}
export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface CommentReqBody {
  comment: CommentReq;
}
export interface CommentReq {
  body: string;
}

export interface CommentRspBody {
  comment: CommentRsp;
}
export interface CommentRsp {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Author;
}
export interface MultiComments {
  comments: CommentRsp[];
} 
export interface ProfileRsp {
  profile: Profile;
}
