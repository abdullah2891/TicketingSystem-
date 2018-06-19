from rest_framework import serializers
from  .models import ProjectModel, IssueModel
from django.contrib.auth.models import User


class ProjectModelSerializer(serializers.ModelSerializer):
	
	owner = serializers.ReadOnlyField(source = 'owner.username')

	class Meta: 
		model = ProjectModel
		fields = ('id', 'projects','owner', 'date_created', 'date_modified')
		read_only_fields = ('date_created' , 'date_modified')



class IssueModelSerializer(serializers.ModelSerializer):
	# print vars(serializers.ModelSerializer)
	# owner = serializers.ReadOnlyField(source = 'owner.username')

	class Meta: 
		model =  IssueModel
		fields = ('id','title', 'description','status', 'projects','date_created', 'date_modified')
		read_only_fields = ('date_created', 'date_modified')


class UserSerializer(serializers.ModelSerializer):
	class Meta: 
		model = User 
		fields = ('id', 'username', 'password','email')