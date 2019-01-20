# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
# Create your models here.


class ProjectModel(models.Model): 
	projects  =  models.CharField(max_length =200, blank = False , unique = True)
	date_created = models.DateTimeField(auto_now_add = True)
	date_modified = models.DateTimeField(auto_now = True)

	owner =  models.ForeignKey('auth.User', related_name= 'projectmodel' , on_delete = models.CASCADE)

	def __str__(self):
		return "{}".format(self.projects)

class IssueModel(models.Model):
	title = models.CharField(max_length = 200, blank = False)
	description =  models.CharField(max_length = 300)
	status  = models.CharField(max_length = 20, blank = False)
	
	projects  =  models.ForeignKey(ProjectModel, on_delete = models.CASCADE)
	
	date_created = models.DateTimeField(auto_now_add = True)
	date_modified = models.DateTimeField(auto_now = True)


	def __str__(self):
		return "{}".format(self.title)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
