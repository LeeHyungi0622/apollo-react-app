import React from "react";
// id parameter를 가져오기 위해서 useParams를 가져온다.
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

// id parameter를 넘겨줘야하는 경우, 해당 query의 이름을 적어줘야 한다.
// 아래 작성해준 query [query name]은 server를 위한 것이 아닌, Apollo를 위한 것이다.
const GET_MOVIE = gql `
  # Apollo를 위한 query의 정의를 작성해주고,
  query getMovie($id: Int!) {
    #  내부에는 서버를 위한 query 코드를 작성해준다.
    movie(id: $id) {
      id
      title
      medium_cover_image
      description_intro
    }
  }
`;

export default () => {
    const { id } = useParams();
    const intId = parseInt(id);
    const { loading, data } = useQuery(GET_MOVIE, {
        variables: { id: intId }
    });
    if (loading) {
        return "loading...";
    }
    if (data && data.movie) {
        return data.movie.title;
    }
    return "Detail";
};