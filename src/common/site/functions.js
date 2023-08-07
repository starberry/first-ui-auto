import React from 'react'
import { useStaticQuery, graphql } from "gatsby";
import axios from "axios";

// export const GetURL = (id) => {
// 	const data = useStaticQuery(graphql`
//     query {
// 		allAllMenus {
// 			edges {
// 				node {
// 					URL
// 					Label
// 					Template
// 					Main_Parent {
// 					Label
// 					URL
// 					Alias
// 					}
// 					Alias
// 					Sub_Parent {
// 					Alias
// 					Label
// 					URL
// 					}
// 					_id
// 					Secondary_URL
// 					Sub_Parent_Secondary {
// 					Label
// 					URL
// 					}
// 				}
// 			}
// 		}
//     }
//   `);

// 	let PageURL = data.allAllMenus.edges.filter(item => item.node._id === id).pop().node;


// 	let URL = PageURL?.Secondary_URL ? PageURL?.Secondary_URL : PageURL.URL

// 	if ((PageURL.Main_Parent != null) && (PageURL.Sub_Parent == null) && (PageURL.Sub_Parent_Secondary == null)) {
// 		URL = PageURL.Main_Parent.URL + '/' + URL
// 	}

// 	else if ((PageURL.Main_Parent != null) && (PageURL.Sub_Parent != null) && (PageURL.Sub_Parent_Secondary == null)) {
// 		URL = PageURL.Main_Parent.URL + '/' + PageURL.Sub_Parent.URL + '/' + URL
// 	}


// 	else if ((PageURL.Main_Parent != null) && (PageURL.Sub_Parent != null) && (PageURL.Sub_Parent_Secondary != null)) {
// 		URL = PageURL.Main_Parent.URL + '/' + PageURL.Sub_Parent.URL + '/' + PageURL.Sub_Parent_Secondary.URL + '/' + URL
// 	}

// 	return URL;

// }


export const NewsDate = (date) => {

	const d = new Date(date);
	const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
	const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(d);
	const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
	return (
		<span>{`${da} ${mo} ${ye}`}</span>
	)
}


export const getIpAddress = (cb) => {

	axios.get(`https://api.ipify.org/?format=json`).then((result) => {
	   cb(result.data?.ip);
   }).catch((err) => {
	   console.log(false)
   });
}