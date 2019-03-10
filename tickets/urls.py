from django.conf.urls import include, url 
from rest_framework.urlpatterns import format_suffix_patterns
from .views import CreateView, DetailsView,IssueView,IssueUpdateView,UserView
from rest_framework.authtoken import views




urlpatterns  = {
	url(r'^auth', include('rest_framework.urls'), name ='rest_framework'),

	url(r'^projects$' , CreateView.as_view() , name = 'create'), 
	url(r'^issues$' , IssueView.as_view() , name = 'create'), 
	url(r'^projects/(?P<pk>[0-9]+)/$' ,DetailsView.as_view() , name = "update"), 
	url(r'^issues/(?P<pk>[0-9]+)$' , IssueUpdateView.as_view() , name = 'update'), 

	url(r'^accounts', UserView.as_view() , name = 'user creation'),
	url(r'^token/', views.obtain_auth_token)
}



urlpatterns = format_suffix_patterns(urlpatterns)
