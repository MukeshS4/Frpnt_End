import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { AppModule } from "../app.module";


@Injectable({ providedIn: 'root' })
export class CommunityService {
    
    pmsCommunity = 'http://localhost:8300/community/';
    constructor(
        private http: HttpClient,
    ) { }

    getAllPosts() {
        const url = 'getAllPosts';
        console.log(this.pmsCommunity + url);
        return this.http.get(this.pmsCommunity + url).pipe(tap((PostData: any) => {
            console.log("PostData - API hit Success", PostData);
            return PostData;
        }))
    }

    getAllReportedPosts() {
        const url = 'getAllReportedPosts';
        console.log(this.pmsCommunity + url);
        return this.http.get(this.pmsCommunity + url).pipe(tap((PostData: any) => {
            console.log("Reported PostData - API hit Success", PostData);
            return PostData;
        }))
    }

    savePost(post: { post: any; postCategory: any; postedBy: string | null; }) {
        const url = 'savePost';
        return this.http.post(this.pmsCommunity + url, post)
            .pipe(tap((resData: any) => {
                console.log("Post Submitted Successfully - API hit success:", resData);
                return resData;
            })
            )
    }

    //   saveComment(post: { postId: any; post: any; postCategory: any; postedBy: any; postedAt: any; deleted: any; reported: any; comment: { comment: any; commentedBy: string | null; }; }) {
    //     const url = 'saveComment';
    //     return this.http.post(this.pmsCommunity + url, post)
    //         .pipe(tap((resData: any) => {
    //             console.log("Comment Submitted Successfully - API hit success:", resData);
    //             return resData;
    //         })
    //         )
    //   }

    saveComment(post: { postId: any; post: any; postCategory: any; postedBy: any; postedAt: any; deleted: any; reported: any; comment: any[]; }) {
        const url = 'saveComment';
        return this.http.post(this.pmsCommunity + url, post)
            .pipe(tap((resData: any) => {
                console.log("Comment Submitted Successfully - API hit success:", resData);
                return resData;
            })
            )
    }

    deletePost(p: any) {
        const url = 'deletePost'
        return this.http.post(this.pmsCommunity + url, p)
            .pipe(tap((resData: any) => {
                console.log("Comment Submitted Successfully - API hit success:", resData);
                return resData;
            })
            )
    }

    reportPost(p: any) {
        const url = 'reportPost'
        return this.http.post(this.pmsCommunity + url, p)
            .pipe(tap((resData: any) => {
                console.log("Reported Successfully - API hit success:", resData);
                return resData;
            })
            )
      }
}