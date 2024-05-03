import { gql } from "@apollo/client";




export const ALl_CATEGORY = gql`
query{
    categories{
      id
      category_name
    }
 }
`;