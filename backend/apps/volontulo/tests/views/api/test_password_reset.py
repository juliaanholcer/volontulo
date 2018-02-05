# -*- coding: utf-8 -*-

"""
.. module:: test_password_reset
"""

import json
from unittest import mock
from django.test import TestCase

class TestPasswordReset(TestCase):
    """ Tests for reseting password """

    def setUp(self):
        """ Set up for each test """
        pass

    # def test_404_if_org_does_not_exist(self):
    #     """ Test for getting an organization """
    #     res = self.client.post('/api/organizations/999/contact/')
    #     self.assertEqual(res.status_code, 404)

    # def test_send_email(self):
    #     """ Test for sending email """
    #     with mock.patch('apps.volontulo.views.api.send_mail') as mock_send:
    #         res = self.client.post(
    #             '/api/organizations/{}/contact/'.format(self.org.id),
    #             json.dumps({
    #                 'name': 'Jon Snow',
    #                 'email': 'iknownothing@winterfell.com',
    #                 'phone_no': '999999999',
    #                 'message': 'Winter is comming!'
    #             }),
    #             content_type='application/json'
    #         )
    #
    #     self.assertEqual(res.status_code, 201)
    #     self.assertEqual(mock_send.call_count, 1)
