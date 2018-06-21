"""lectoriy URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import RedirectView
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter

from core.views import login_view, UserViewSet
from events.views import EventViewSet
from lectoriy import index
from comments.views import CommentViewSet
from videos.views import CourseViewSet, VideoViewSet

router = DefaultRouter()
router.register('comments', CommentViewSet, base_name='comment')
router.register('users', UserViewSet, base_name='user')
router.register('courses', CourseViewSet, base_name='course')
router.register('videos', VideoViewSet, base_name='videos')
router.register('events', EventViewSet, base_name='events')

urlpatterns = [
    # path('', RedirectView.as_view(url='accounts/login')),
    path('admin/', admin.site.urls),
    path('accountss/', include('core.urls', namespace='core')),
    path('social/', include('social_django.urls', namespace='social')),
    path('api/v1/', include(router.urls)),
    path('api-token-auth/', obtain_auth_token),

    re_path(r'^$', index.index, name ='index_page'),
    re_path(r'^.*?/$', index.index),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ]  + urlpatterns