# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import generics
from .serializers import ProjectModelSerializer,IssueModelSerializer,UserSerializer

# models defined 
from .models import ProjectModel,IssueModel
from django.contrib.auth.models import User

#rest framework libraries
from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView 
from rest_framework.response import Response

from .permissions import IsOwner

# debugger 
from pprint import pprint


# Create your views here.
class CreateView(generics.ListCreateAPIView): 
	queryset =  ProjectModel.objects.all()
	serializer_class =  ProjectModelSerializer
	permission_classes =  (permissions.IsAuthenticated,IsOwner)

	def perform_create(self,  serializers): 
		serializers.save(owner = self.request.user )

	def filter_queryset(self,queryset):
		return queryset.filter(owner = self.request.user)




class DetailsView(generics.RetrieveUpdateDestroyAPIView): 
	queryset =  ProjectModel.objects.all()
	serializer_class = ProjectModelSerializer
	permission_classes =  (permissions.IsAuthenticated,IsOwner)


class IssueView(generics.ListCreateAPIView): 
	queryset = IssueModel.objects.all()
	serializer_class =  IssueModelSerializer
	permission_classes =  (permissions.IsAuthenticated,)

	def perform_create(self, serializers):
		serializers.save(owner = self.request.user )
	
	def filter_queryset(self,queryset):
		return queryset.filter(owner = self.request.user)

class IssueUpdateView(generics.RetrieveUpdateDestroyAPIView):
	queryset =  IssueModel.objects.all()
	serializer_class = IssueModelSerializer
	permission_classes = (permissions.IsAuthenticated,)


class UserView(generics.CreateAPIView): 
	queryset = User.objects.all() 
	serializer_class =  UserSerializer
	permission_classes = (permissions.AllowAny,)

	def perform_create(self, serializers): 
		# creating the user  
		data = serializers.data 
		user =  User.objects.create_user(data['username'] , data['email'] , data['password'] )

		user.save()
