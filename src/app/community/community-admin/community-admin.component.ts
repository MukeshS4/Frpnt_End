import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { sideNavigationItem } from 'src/app/app-common/data/navigation.data';
import { SideNavigationItem } from 'src/app/app-common/models';
import { CommunityService } from '../community.service';

@Component({
  selector: 'app-community-admin',
  templateUrl: './community-admin.component.html',
  styleUrls: ['./community-admin.component.css']
})
export class CommunityAdminComponent implements OnInit {
  commentArr!: Array<any>;
  checkPostId = '';
  commentBox = false;
  displayModal = false;
  loading: boolean = false;
  isLoading = false;
  communityPosts = [''];
  reportedCommunityPosts = [''];
  sideNavigationdata: SideNavigationItem[] = sideNavigationItem;
  statuses: any;
  newPostForm: FormGroup;
  commentForm: FormGroup;
  constructor(
    private communityService: CommunityService,
    private fb: FormBuilder
  ) {
    this.newPostForm = this.fb.group({
      postCategory: ['', [Validators.required]],
      postTextArea: ['', [Validators.required, Validators.minLength(3)]]
    }),
      this.commentForm = this.fb.group({
        textAreaComment: ['', [Validators.required, Validators.minLength(3)]]
      })
  }

  ngOnInit(){
    this.getAllReportedPost();
    this.getAllPosts();
  }

  onComment(p: any) {
    this.checkPostId = p.postId;
    this.commentBox = true;
  }

  showPostModalDialog() {
    this.displayModal = true;
  }

  getAllReportedPost() {
    this.communityService.getAllReportedPosts().subscribe(
      data => {
        if (data !== null) {
          this.reportedCommunityPosts = data;
          console.log(this.communityPosts);
        }
      }, error => {
        this.reportedCommunityPosts = ["No Recods Found"];
      }
    )
  }

  getAllPosts() {
    this.communityService.getAllPosts().subscribe(
      data => {
        if (data !== null) {
          this.communityPosts = data;
          console.log(this.communityPosts);
        }
      }, error => {
        this.communityPosts = ["No Recods Found"];
      }
    )
  }

  clear(table: Table) {
    table.clear();
  }

  onSubmitDelete(post: any) {
    
  }

  onCommentSubmit(p: any) {
    this.isLoading = true;
    this.commentArr = [{
      comment: this.commentForm.controls.textAreaComment.value,
      commentedBy: localStorage.getItem('emailId')
    }];
    const post = {
      postId: p.postId,
      post: p.post,
      postCategory: p.postCategory,
      postedBy: p.postedBy,
      postedAt: p.postedAt,
      deleted: p.deleted,
      reported: p.reported,
      comment : this.commentArr
    }
    this.communityService.saveComment(post).subscribe(
      data => {
        this.commentForm.controls.textAreaComment.setValue('');
        this.commentBox = false;
        this.isLoading = false;
      }, error => {
        console.log(error);
      }
    )
    location.reload();
  }

  onDelete(p:any){
    this.isLoading=true;
    this.communityService.deletePost(p).subscribe(
      data=>{
        this.isLoading=false;
        location.reload();
      },error=>{
        console.log(error);
      }
    )

  }

  onPostSubmit() {
    const post = {
      post: this.newPostForm.controls.postTextArea.value,
      postCategory: this.newPostForm.controls.postCategory.value,
      postedBy: localStorage.getItem('emailId')
    }
    console.log("in console ", post);
    this.isLoading = true;
    this.communityService.savePost(post).subscribe(
      data => {
        if (data !== null) {
          this.isLoading = false;
          this.displayModal = false;
          this.getAllPosts();
        }
      }, error => {
        console.log("error occured in post submit ", error);
      }
    )
  }
}
