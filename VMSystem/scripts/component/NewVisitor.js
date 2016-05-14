import React from 'react';

class NewVisitor extends React.Component {
  render(){
    return (
      <div>
        <section className="content-header">
          <h1>
            New Visitor
          </h1>
          <ol className="breadcrumb">
            <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
            <li><a href="#">Examples</a></li>
            <li className="active">User profile</li>
          </ol>
        </section>

        <section className="content">

          <div className="row">
            <div className="col-md-3">
              <div className="box box-primary">
                <div className="box-body box-profile">
                  <img className="profile-user-img img-responsive img-circle" src="../../public/dist/img/user4-128x128.jpg" alt="User profile picture"/>
                  <h3 className="profile-username text-center">Visitor Name</h3>
                  <p className="text-muted text-center">Conact No</p>
                  {/*  <a href="#" className="btn btn-primary btn-block"><b>Follow</b></a> */}
                  <div className="form-group">
                    <div>
                      <button type="submit" className="btn btn-danger pull-left">Browse...</button>
                      <button type="submit" className="btn btn-danger pull-right">Capture</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="col-md-9">
              <div className="nav-tabs-custom">
                <ul className="nav nav-tabs">
                  <li className="active"><a href="#settings" data-toggle="tab">Visitor</a></li>
                </ul>
                <div className="tab-content">

                   <div className="active tab-pane" id="settings">
                    <form className="form-horizontal">

                      <div className="form-group">
                        <label for="inputName" className="col-sm-2 control-label">Name</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="inputName" placeholder="Name"/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label for="inputName" className="col-sm-2 control-label">Contact No</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="inputContactNo" placeholder="Contact No"/>
                        </div>
                      </div>

                      <div className="form-group">
                        <label for="inputName" className="col-sm-2 control-label">Id Proof Type</label>
                        <div className="col-sm-10">
                        <select className="form-control" id="inputIdProofType" >
                          <option>Voter Id</option>
                          <option>Aadhar Card</option>
                          <option>PAN Card</option>
                          <option>Driving License</option>
                          <option>Passport</option>
                        </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label for="inputName" className="col-sm-2 control-label">Id Proof No</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="inputIdProofNo" placeholder="Id Proof No"/>
                        </div>
                      </div>

                      <div className="form-group">
                        <label for="inputName" className="col-sm-2 control-label">Visitor Type</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="inputVisitorType" placeholder="Visitor Type"/>
                        </div>
                      </div>

                      <div className="form-group">
                        <label for="inputName" className="col-sm-2 control-label">Gender</label>
                        <div className="col-sm-10">
                          <label className="radio-inline">
                            <input type="radio" name="optionGender" value="Male" />
                            Male
                          </label>
                          <label className="radio-inline">
                            <input type="radio" name="optionGender" value="Female"/>
                            Female
                          </label>
                          </div>
                      </div>

                      <div className="form-group">
                        <label for="inputName" className="col-sm-2 control-label">Visit Purpose</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="inputVisitPurpose" placeholder="Visit Purpose"/>
                        </div>
                      </div>

                      <div className="form-group">
                        <label for="inputName" className="col-sm-2 control-label">Note</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="inputNote" placeholder="Note(Optional)"/>
                        </div>
                      </div>

                      <div className="form-group">
                        <label for="inputName" className="col-sm-2 control-label">Person To Meet</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="inputPersonToMeet" placeholder="Person To Meet"/>
                        </div>
                      </div>

                      <div className="form-group">
                        <label for="inputName" className="col-sm-2 control-label">Tower No</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="inputTowerNo" placeholder="Tower No"/>
                        </div>
                      </div>

                      <div className="form-group">
                        <label for="inputName" className="col-sm-2 control-label">Flat No</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="inputFlatNo" placeholder="Flat No"/>
                        </div>
                      </div>

                      <div className="form-group">
                        <label for="inputName" className="col-sm-2 control-label">Vehicle Type</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="inputVehicleType" placeholder="Vehicle Type"/>
                        </div>
                      </div>

                      <div className="form-group">
                        <label for="inputName" className="col-sm-2 control-label">Vehicle No</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="inputVehicleNo" placeholder="Vehicle No"/>
                        </div>
                      </div>

                      <div className="form-group">
                        <label for="inputName" className="col-sm-2 control-label">Gate No</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="inputGateNo" placeholder="Gate No"/>
                        </div>
                      </div>

                      <div className="form-group">
                        <label for="inputName" className="col-sm-2 control-label">No Of Visitors</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="inputNoOfVisitors" placeholder="No Of Visitors"/>
                        </div>
                      </div>

                      <div className="form-group">
                        <label for="inputName" className="col-sm-2 control-label">Frequent Visitor</label>
                        <div className="col-sm-10">
                          <label className="checkbox-inline">
                            <input type="checkbox" />   &nbsp;
                          </label>
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                          <button type="submit" className="btn btn-danger pull-right">Submit</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>
      </div>)
    }
}

export default NewVisitor;
