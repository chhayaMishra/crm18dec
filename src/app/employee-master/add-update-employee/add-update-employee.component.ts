import { OrganizationService } from "./../../organization-master/Service/organization.service";
import { Component, OnInit } from "@angular/core";
import { CRUDFunction } from "../../shared/global-functions/crudFunctions.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmployeeService } from "../Service/employee.service";
import { FormateDateService } from "../../shared/global-functions/formate-date.service";

@Component({
  selector: "app-add-update-employee",
  templateUrl: "./add-update-employee.component.html",
  styleUrls: ["./add-update-employee.component.scss"],
})
export class AddUpdateEmployeeComponent implements OnInit {
  information: any;
  initialInformationForm: FormGroup;
  personalInformationForm: FormGroup;
  bankInformationForm: FormGroup;
  officalInformationForm: FormGroup;
  today = new Date();
  submitted: boolean = false;
  bloodGroupList: any[];
  maritalStatus: any = [
    "Not Set",
    "Unmarried",
    "Married",
    "Divorced",
    "Widow",
    "Widower",
  ];
  employeeTypeList: any[];
  departmentList: any[];
  designationList: any[];
  employeeList: any[];
  shiftGroupList: any[];
  weekOffList: any[];
  organizationList: any[];
  hide: boolean = true;
  officeEmail: any;

  constructor(
    private CRUDFunction: CRUDFunction,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private organizationService: OrganizationService,
    private formateDateService: FormateDateService,
  ) {}

  ngOnInit(): void {
    this.dataFromURL();
    this.getbloodtype();
    this.getemployeetype();
    this.getshiftgroup();
    this.getallweekoffsgroup();
    this.getallactivedeparmentlist();
    this.orgbycompanyidclaims();
    this.emplistnotself(this.information);
  }

  //#region function to get the data from the URL
  dataFromURL() {
    this.information = this.CRUDFunction.dataDecoding();
    this.information?.message == "Add"
      ? this.initialInformationForms()
      : this.information?.message == "Add Candidate"
        ? this.addCandidate(this.information?.employeeId)
        : this.getnewemployeebyid(this.information?.employeeId);
    this.initialInformationForms();
    this.personalInformationForms();
    this.bankInformationForms();
    this.officalInformationForms();
  }
  //#endregion

  //#region function to create the form for initial information
  initialInformationForms() {
    this.initialInformationForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      middleName: ["", Validators.required],
      lastName: ["", Validators.required],
      gender: ["", Validators.required],
      dateOfBirth: ["", Validators.required],
      mobilePhone: ["", Validators.required],
      personalEmail: ["", Validators.required],
      officeEmail: ["", Validators.required],
    });
  }
  get initial() {
    return this.initialInformationForm.controls;
  }
  //#endregion

  //#region function to create the form for personal Information
  personalInformationForms() {
    this.personalInformationForm = this.formBuilder.group({
      nickName: [""],
      fatherName: [""],
      motherName: [""],
      dobPerAdhaar: [""],
      bloodGroup: [""],
      totalExperience: [""],
      maritalStatus: [""],
      medicalIssue: [""],
      medicalInsuranceNumber: [""],
      aadharNumber: [""],
      panNumber: [""],
      whatsappNumber: [""],
      emergencyNumber: [""],
      localAddress: [""],
      permanentAddress: [""],
      citizenship: [""],
      visaType: [""],
      visaNumber: [""],
      passportNumber: [""],
      passportValidUntil: [""],
    });
  }

  get personalInformation() {
    return this.personalInformationForm.controls;
  }
  //#endregion

  //#region function to create the form for bank Information
  bankInformationForms() {
    this.bankInformationForm = this.formBuilder.group({
      bankAccountNumber: ["", Validators.required],
      ifsc: ["", Validators.required],
      accountHolderName: ["", Validators.required],
      bankName: ["", Validators.required],
      uan: ["", Validators.required],
      sortCode: ["", Validators.required],
    });
  }

  get bankInformation() {
    return this.bankInformationForm.controls;
  }
  //#endregion

  //#region function to create the form for offical Information
  officalInformationForms() {
    this.officalInformationForm = this.formBuilder.group({
      employeeTypeId: ["", Validators.required],
      departmentId: ["", Validators.required],
      designationId: ["", Validators.required],
      joiningDate: ["", Validators.required],
      confirmationDate: ["", Validators.required],
      salary: ["", Validators.required],
      biometricId: ["", Validators.required],
      reportingManagerId: ["", Validators.required],
      weekOffId: ["", Validators.required],
      shiftGroupId: ["", Validators.required],
      orgId: ["", Validators.required],
      employeeCode: ["", Validators.required],
      refereeNumber: ["", Validators.required],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
          ),
        ],
      ],
      isEmployeeIsLock: [false, Validators.required],
    });
  }

  get officialInformation() {
    return this.officalInformationForm.controls;
  }
  //#endregion

  //#region function to get the information of the employee using employee id
  getnewemployeebyid(employeeId) {
    let apiName = "";
    this.information?.message == "Edit"
      ? (apiName = "getnewemployeebyid")
      : (apiName = "getnewemployeeonboardingbyid");
    this.employeeService[apiName](employeeId).subscribe(
      (res: any) => {
        let employeeInfo = this.CRUDFunction.responceBinding(res);
        employeeInfo
          ? (this.patchInitialInformations(employeeInfo),
            this.patchPersonalInformation(employeeInfo),
            this.patchBankInformation(employeeInfo),
            this.patchOfficalInformation(employeeInfo))
          : "";
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to add candidate
  addCandidate(employeeId) {}
  //#endregion

  //#region function to patch the initial information of the employee
  patchInitialInformations(employeeInfo) {
    this.officeEmail = employeeInfo.officeEmail;
    this.initialInformationForm.patchValue({
      firstName: employeeInfo.firstName,
      middleName: employeeInfo.middleName,
      lastName: employeeInfo.lastName,
      gender: employeeInfo.gender,
      dateOfBirth: employeeInfo.dateOfBirth,
      mobilePhone: employeeInfo.mobilePhone,
      personalEmail: employeeInfo.personalEmail,
      officeEmail: employeeInfo.officeEmail,
    });
  }
  //#endregion

  //#region function to patch the personal information
  patchPersonalInformation(employeeInfo) {
    this.personalInformationForm.patchValue({
      nickName: employeeInfo.nickName,
      fatherName: employeeInfo.fatherName,
      motherName: employeeInfo.motherName,
      dobPerAdhaar: employeeInfo.dobPerAdhaar,
      bloodGroup: employeeInfo.bloodGroup,
      totalExperience: employeeInfo.totalExperience,
      maritalStatus: employeeInfo.maritalStatus,
      medicalIssue: employeeInfo.medicalIssue,
      medicalInsuranceNumber: employeeInfo.medicalInsuranceNumber,
      aadharNumber: employeeInfo.aadharNumber,
      panNumber: employeeInfo.panNumber,
      whatsappNumber: employeeInfo.whatsappNumber,
      emergencyNumber: employeeInfo.emergencyNumber,
      localAddress: employeeInfo.localAddress,
      permanentAddress: employeeInfo.permanentAddress,
      citizenship: employeeInfo.citizenship,
      visaType: employeeInfo.visaType,
      visaNumber: employeeInfo.visaNumber,
      passportNumber: employeeInfo.passportNumber,
      passportValidUntil: employeeInfo.passportValidUntil,
    });
  }
  //#endregion

  //#region function to patch the value in bank information
  patchBankInformation(employeeInfo) {
    this.bankInformationForm.patchValue({
      bankAccountNumber: employeeInfo.bankAccountNumber,
      ifsc: employeeInfo.ifsc,
      accountHolderName: employeeInfo.accountHolderName,
      bankName: employeeInfo.bankName,
      uan: employeeInfo.uan,
      sortCode: employeeInfo.sortCode,
    });
  }
  //#endregion

  //#region function to patch the offical information
  patchOfficalInformation(employeeInfo) {
    this.departmentSelectioin(employeeInfo.departmentId);
    this.officalInformationForm.patchValue({
      employeeTypeId: employeeInfo.employeeTypeId,
      departmentId:
        employeeInfo.departmentId == 0 ? null : employeeInfo.departmentId,
      designationId:
        employeeInfo.designationId == 0 ? null : employeeInfo.designationId,
      joiningDate: employeeInfo.joiningDate,
      confirmationDate: employeeInfo.confirmationDate,
      salary: employeeInfo.salary,
      biometricId: employeeInfo.biometricId,
      reportingManagerId:
        employeeInfo.reportingManagerId == 0
          ? null
          : employeeInfo.reportingManagerId,
      shiftGroupId: employeeInfo.shiftGroupId,
      weekOffId: employeeInfo.weekOffId,
      orgId: employeeInfo.orgId == 0 ? null : employeeInfo.orgId,
      employeeCode: employeeInfo.employeeCode,
      refereeNumber: employeeInfo.refereeNumber,
      password: employeeInfo.password,
      isEmployeeIsLock: !employeeInfo.isEmployeeIsLock,
    });
  }
  //#endregion

  //#region function to get the employee type
  getemployeetype() {
    this.employeeService.getemployeetype().subscribe(
      (res: any) => {
        this.employeeTypeList = this.CRUDFunction.responceBinding(res);
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to get all active Department
  getallactivedeparmentlist() {
    this.organizationService.getallactivedeparmentlist().subscribe(
      (res: any) => {
        this.departmentList = this.CRUDFunction.responceBinding(res);
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to get the designation list on behalf of department id
  departmentSelectioin(departmentId) {
    this.organizationService.designationbydepartment(departmentId).subscribe(
      (res: any) => {
        this.designationList = this.CRUDFunction.responceBinding(res);
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to get the employee list
  emplistnotself(information) {
    let apiName = "";
    information?.message == "Edit"
      ? (apiName = "emplistnotself")
      : (apiName = "getallemployeelist");
    this.employeeService[apiName](information?.employeeId).subscribe(
      (res: any) => {
        this.employeeList = this.CRUDFunction.responceBinding(res);
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to get shift group
  getshiftgroup() {
    this.employeeService.getshiftgroup().subscribe(
      (res: any) => {
        this.shiftGroupList = this.CRUDFunction.responceBinding(res);
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to get all week off
  getallweekoffsgroup() {
    this.employeeService.getallweekoffsgroup().subscribe(
      (res: any) => {
        this.weekOffList = this.CRUDFunction.responceBinding(res);
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to get the blood group type
  getbloodtype() {
    this.employeeService.getbloodtype().subscribe(
      (res: any) => {
        this.bloodGroupList = this.CRUDFunction.responceBinding(res);
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to get the organization list
  orgbycompanyidclaims() {
    this.employeeService.orgbycompanyidclaims().subscribe(
      (res: any) => {
        this.organizationList = this.CRUDFunction.responceBinding(res);
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to submit the employee Information
  submitEmployeeInformations(initialInformationForm) {
    this.submitted = true;
    this.CRUDFunction.checkValidation(initialInformationForm)
      ? this.submitInitialValue(initialInformationForm.value)
      : "";
  }

  submitInitialValue(value) {
    value["dateOfBirth"] = this.formateDateService.formatDate(
      value["dateOfBirth"],
    );
    let post = {
      onBoardingStage: 1,
      updateIniTialInformation: value,
    };
    let apiName = "";
    let returnUrl = "";
    // at this point I dont have hiring module in it thats why it is not the part of 1st ternery operator
    this.information?.message == "Add"
      ? ((apiName = "createemployeeentity"),
        (returnUrl = "employee-master/employee-onboarding"),
        (post = value))
      : this.information?.message == "Edit"
        ? ((apiName = "updatenewemployee"),
          (post["employeeId"] = this.information?.employeeId),
          (returnUrl = "employee-master/all-employee"))
        : ((apiName = "updatenewemployeeonboarding"),
          (post["employeeOnBoardingId"] = this.information?.employeeId),
          (returnUrl = "employee-master/employee-onboarding"));

    this.employeeService[apiName](post).subscribe(
      (res: any) => {
        this.CRUDFunction.apiResponce(res, "Employee Onbording")
          ? this.CRUDFunction.routingWithOutData(returnUrl)
          : "";
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to submit the personal information of user
  submitPersoanlInformation(personalInformationForm) {
    this.submitted = true;
    this.CRUDFunction.checkValidation(personalInformationForm)
      ? this.submitPersonalValue(personalInformationForm.value)
      : "";
  }

  submitPersonalValue(value) {
    value["dobPerAdhaar"] = this.formateDateService.formatDate(
      value["dobPerAdhaar"],
    );
    value["passportValidUntil"] = this.formateDateService.formatDate(
      value["passportValidUntil"],
    );
    let apiName = "";
    let post = {
      onBoardingStage: 2,
      updatePersonalInformations: value,
    };
    this.information?.message == "Edit"
      ? ((apiName = "updatenewemployee"),
        (post["employeeId"] = this.information?.employeeId))
      : ((apiName = "updatenewemployeeonboarding"),
        (post["employeeOnBoardingId"] = this.information?.employeeId));
    this.employeeService[apiName](post).subscribe(
      (res: any) => {
        this.CRUDFunction.apiResponce(res, "Personal Information");
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to update bank inforamtion of user
  submitBankInformation(bankInformationForm) {
    this.submitted = true;
    this.CRUDFunction.checkValidation(bankInformationForm)
      ? this.submitBankValue(bankInformationForm.value)
      : "";
  }

  submitBankValue(value) {
    let post = {
      onBoardingStage: 3,
      updateBankInformation: value,
    };
    let apiName = "";
    this.information?.message == "Edit"
      ? ((apiName = "updatenewemployee"),
        (post["employeeId"] = this.information?.employeeId))
      : ((apiName = "updatenewemployeeonboarding"),
        (post["employeeOnBoardingId"] = this.information?.employeeId));
    this.employeeService[apiName](post).subscribe(
      (res: any) => {
        this.CRUDFunction.apiResponce(res, "Bank Information");
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region fucntion to submit the official information
  submitOfficialInformatrion(officalInformationForm) {
    this.submitted = true;
    this.CRUDFunction.checkValidation(officalInformationForm)
      ? this.submitOfficialValue(officalInformationForm.value)
      : "";
  }

  submitOfficialValue(value) {
    value["joiningDate"] = this.formateDateService.formatDate(
      value["joiningDate"],
    );
    value["confirmationDate"] = this.formateDateService.formatDate(
      value["confirmationDate"],
    );
    let post = {
      onBoardingStage: 4,
      updateOfficialInformation: value,
    };
    let apiName = "";
    let returnURL = "";
    this.information?.message == "Edit"
      ? ((apiName = "updatenewemployee"),
        (post["employeeId"] = this.information?.employeeId),
        (returnURL = "employee-master/all-employee"))
      : ((apiName = "updatenewemployeeonboarding"),
        (post["employeeOnBoardingId"] = this.information?.employeeId),
        (returnURL = "employee-master/employee-onboarding"));
    this.employeeService[apiName](post).subscribe(
      (res: any) => {
        this.CRUDFunction.apiResponce(res, "Official Information")
          ? this.CRUDFunction.routingWithOutData(returnURL)
          : "";
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion
}
