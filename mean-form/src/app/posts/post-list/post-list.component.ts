import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  // posts = [ this is hard coded data
  //   {title: 'one', content: '1'},
  //   {title: 'two', content: '2'},
  //   {title: 'three', content: '3'},
  //   {title: 'four', content: '4'}
  // ];

  posts: Post[] = [];
  private postSub: Subscription;

  constructor(public postService: PostService) {}

  ngOnInit() {
     this.postService.getPosts();
    this.postSub = this.postService.getPostsUpdateListener()
    .subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }

  ngOndestroy() {
    this.postSub.unsubscribe();
  }
}
