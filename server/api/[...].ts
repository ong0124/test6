import { useBase, createRouter, defineEventHandler } from 'h3';

import * as usersCtrl from '~/server/controller/users';
import * as BookingCtrl from '~/server/controller/booking';
import * as RefundCtrl from '~/server/controller/refund'
import * as offDaysCtrl from '~/server/controller/offDays'; 

const router = createRouter();

router.get('/GETbooking', defineEventHandler(BookingCtrl.read));
router.post('/POSTbooking', defineEventHandler(BookingCtrl.create));
router.get('/confirmationPage/:id', defineEventHandler(BookingCtrl.FindBookingDetailById));

router.get('/myTrip/:id', defineEventHandler(BookingCtrl.FindBookingByUserId));
router.get('/reschedulePage/:id', defineEventHandler(BookingCtrl.NotTraveledBooking));
router.get('/reschedulePage/details/:id', defineEventHandler(BookingCtrl.FindBookingDetailById));
// router.put('/detailsUpdate/:id', defineEventHandler(BookingCtrl.update));
router.delete('/DeleteBookingById', defineEventHandler(BookingCtrl.remove));

router.get('/FindBookingDetailById/:id', defineEventHandler(BookingCtrl.FindBookingDetailById));

router.post('/PostRefund/:id',defineEventHandler(RefundCtrl.create));
router.get('/GetAllRefund',defineEventHandler(RefundCtrl.readAll));
router.put('/ApproveRefund', defineEventHandler(RefundCtrl.update));

router.get('/GETDetailUsers/:id', defineEventHandler(usersCtrl.detail));
router.get('/GetUser', defineEventHandler(usersCtrl.read));
router.put('/EditUser', defineEventHandler(usersCtrl.update));
router.delete('/DeleteUser', defineEventHandler(usersCtrl.remove));
router.post('/POSTUser', defineEventHandler(usersCtrl.create));

router.get('/GETallOffdays',defineEventHandler(offDaysCtrl.read));
router.post('/CreateOffDays',defineEventHandler(offDaysCtrl.createOffDays));
router.delete('/DeleteOffDays', defineEventHandler(offDaysCtrl.remove));
export default useBase('/api', router.handler);
