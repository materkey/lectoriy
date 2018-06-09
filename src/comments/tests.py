# import unittest
#
# from django.test import TestCase
#
# # Create your tests here.
# from rest_framework import status
# from rest_framework.test import APITestCase
#
# from comments.models import Comment
#
#
# def foo(a, b):
#     return a / b
#
# class TesSum(unittest.TestCase):
#     def test_simple_sum(self):
#         result = foo(10, 5)
#         self.assertEqual(result, 2)
#
#     def test_zero(selfself):
#         result = foo(0, 10)
#         self.assertEqual(result, 0)
#
#
# class CommentTests(APITestCase):
#     def setUp(self):
#         super().setUp()
#         user = User.objects.create_user('test', 'test@test.com', 'testpass')
#         self.current_user = user
#         self.client.force_login(user=user)
#
#     def test_create_comment(self):
#         url = reverse('comments-list')
#         data = {}
#         response = self.client.post(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(Comment.objects.count(), 1)
#         self.assertEqual(Comment.objects.all().first().text, 'Test comment.')
#         self.assertEqual(Comment.objects.all().first().author, self.current_user)
#
#     def test_check_validation(self):
#        self.client.logout()
#        url = reverse('comments-list')
#        data = {}
#        response = self.client.post(url, data, format='json')
#        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
#        self.assertEqual(Comment.objects.count(), 0)
