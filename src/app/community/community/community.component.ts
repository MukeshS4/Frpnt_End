import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { sideNavigationItem } from 'src/app/app-common/data/navigation.data';
import { SideNavigationItem } from 'src/app/app-common/models';
import { CommunityService } from '../community.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {
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
  newCPostForm: FormGroup;
  commentForm: FormGroup;
  constructor(
    private communityService: CommunityService,
    private fb: FormBuilder
  ) {
    this.newCPostForm = this.fb.group({
      postCategory1: ['', [Validators.required]],
      postTextArea: ['', [Validators.required, Validators.minLength(3)]]
    }),
      this.commentForm = this.fb.group({
        textAreaComment: ['', [Validators.required, Validators.minLength(3)]]
      })
  }

  ngOnInit(){
    this.getAllPosts();
  }

  onComment(p: any) {
    this.checkPostId = p.postId;
    this.commentBox = true;
  }

  showPostModalDialog() {
    this.displayModal = true;
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

  onReport(p:any){
    this.isLoading=true;
    this.communityService.reportPost(p).subscribe(
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
      post: this.newCPostForm.controls.postTextArea.value,
      postCategory: this.newCPostForm.controls.postCategory1.value,
      postedBy: localStorage.getItem('emailId')
    }
    // console.log(this.newCPostForm.controls.postCategory.value);
    console.log(this.newCPostForm.controls.postCategory1.value);

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
